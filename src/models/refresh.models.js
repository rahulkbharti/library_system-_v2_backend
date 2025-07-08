import runQuery from "../helper/query.helper.js";
const RefreshModel = {
    create : (data)=>{
      return runQuery("INSERT INTO refresh_tokens (user_id, refresh_token) VALUES (?, ?)", [data.user_id, data.refresh_token]);
    },
    view : (refresh_token)=>{
      if(refresh_token){
         return runQuery("SELECT * FROM refresh_tokens WHERE refresh_token = ?", [refresh_token]);
      }
      return runQuery("SELECT * FROM refresh_tokens");
    },
    upadate : (data)=>{
      const keys = Object.keys(data.update);
      const values = Object.values(data.update);
      values.push(data.refresh_token);
      const query = `UPDATE refresh_tokens SET ${keys.map((key) => key + " = ?").join(", ")} WHERE refresh_token = ?`;
      return runQuery(query, values);
    },
    delete :(refresh_token)=>{
      return runQuery("DELETE FROM refresh_tokens WHERE refresh_token =?",[refresh_token]);
    }
}
export default RefreshModel;
