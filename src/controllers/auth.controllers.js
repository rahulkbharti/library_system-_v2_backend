// Helper functions
const generateTokens = (email) => {
    const accessToken = jwt.sign({ email }, SECRET_KEY, { expiresIn: TOKEN_EXPIRY });
    const refreshToken = jwt.sign({ email }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRY });
    refreshTokens.push(refreshToken);
    return { accessToken, refreshToken };
};

const verifyGoogleToken = async (access_token) => {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token });
    
    const oauth2 = google.oauth2({ 
        auth: oauth2Client, 
        version: "v2" 
    });

    const { data } = await oauth2.userinfo.get();
    return {
        email: data.email,
        firstName: data.given_name,
        lastName: data.family_name,
        fullName: data.name,
        picture: data.picture,
        verified_email: data.verified_email
    };
};

// Unified Google Authentication Handler
const handleGoogleAuth = async (req, res) => {
    const { access_token, role} = req.body;
    if (!access_token) return res.status(400).json({ error: "Access token required" });

    try {
        const userInfo = await verifyGoogleToken(access_token);
        if (!userInfo.verified_email) {
            return res.status(401).json({ message: "Email not verified" });
        }

        // Check if user exists
        let user = users.find(u => u.email === userInfo.email);
        const isNewUser = !user;

        // Register if new user
        if (isNewUser) {
            userInfo.role = role || "user"; // Default role if not provided
            users.push(userInfo);
            user = userInfo;
        }

        // Generate tokens and return response
        const { accessToken, refreshToken } = generateTokens(user.email);
        const { password, ...safeUserData } = user;

        res.json({
            accessToken,
            refreshToken,
            userData: safeUserData,
            isNewUser,
            exp: Date.now() + 30000
        });

    } catch (error) {
        console.error("Google auth error:", error);
        res.status(500).json({ error: "Google authentication failed" });
    }
};

// Routes
app.post("/api/auth/google", handleGoogleAuth);  // Unified endpoint
// Routes
// app.post("/api/auth/google-register", (req, res) => handleGoogleAuth(req, res, true));
// app.post("/api/auth/google-login", (req, res) => handleGoogleAuth(req, res, false));

app.post("/api/auth/register", async (req, res) => {
    try {
        const { email, firstName, lastName, fullName, password ,role } = req.body;
        if (!email || !firstName || !lastName || !fullName || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
       
        const existingUser = users.find(u => u.email === email);
        if (existingUser) return res.status(409).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { email, firstName, lastName, fullName, password: hashedPassword , role };
        users.push(newUser);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Registration failed" });
    }
});

app.post("/api/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = users.find(u => u.email == email);
        if (!user) return res.status(401).json({ message: "Invalid credentials" });
        if (!user.password) return res.status(400).json({ 
            message: "Google-registered account. Please use Google login" 
        });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ message: "Invalid credentials" });

        const { accessToken, refreshToken } = generateTokens(user.email);
        const { password : d, ...safeUserData} = user;
        res.json({  
            accessToken, 
            refreshToken, 
            userData:safeUserData,
            exp: Date.now() + 30000 
        });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
});

app.post("/api/auth/refreshToken", (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.status(403).json({ error: "Invalid refresh token" });
    }

    jwt.verify(refreshToken, REFRESH_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Token verification failed" });
        
        const accessToken = jwt.sign({ email: decoded.email }, SECRET_KEY, {
            expiresIn: TOKEN_EXPIRY
        });
        
        res.json({ 
            accessToken, 
            exp: Date.now() + 30000 
        });
    });
});

app.post("/api/auth/logout", (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(t => t !== token);
    res.json({ message: "Logout successful" });
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: "Forbidden" });
        req.user = user;
        next();
    });
};

app.get("/api/dashboard", authenticateToken, (req, res) => {
    res.json({ message: `Welcome to dashboard!` });
});
