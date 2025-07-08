import { google } from "googleapis";

// Google OAuth2 client
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
        first_name: data.given_name,
        last_name: data.family_name,
        full_name: data.name,
        picture: data.picture,
        verified_email: data.verified_email
    };
};

export default verifyGoogleToken;