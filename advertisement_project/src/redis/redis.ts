import { createClient } from "redis";


const client = createClient();
client.connect();
client.on('error', err => console.log('Redis client error', err));

export class RedisSesssion{
    static findOne(arg0: { where: { email: any; }; }) {
        throw new Error('Method not implemented.');
    }
    static update(arg0: { isActive: boolean; }, arg1: { where: { email: any; }; }) {
        throw new Error('Method not implemented.');
    }
    static async maintain_session_redis(client:any,user:any){
        try{
            client.on('error',err=>{
                console.log("Redis client error",err)
            })
            if(user){
                await client.SET(user.email,JSON.stringify({
                    'id':user.id,
                    'isActive':true
                }))
                const RedisSesssionManage=await client.get(user.email)
                console.log(RedisSesssionManage);
                
            }
            else{
                console.log("user not found");
                
            }
        }
        catch(err){
            console.log("redis not set successfully",err);
            
        }
    }

    static async logout_session_redis(client:any, user) {
        console.log(user.email);
        try {
            // console.log(user.username);
            await client.del(user.email);
            // const redisSessions = await client.get(user.username);
            console.log("delete successfully");
        }
        catch (err) {
            console.log("error in deleting", err);
        }
    }
}

export class Redis {
      static async save_otp(email:string, OTP:any) {
      const client = createClient();
      client.connect();
      client.on('error', err => console.log('Redis client error', err));

      
      try {
         await client.setEx(email, 300, JSON.stringify({
            otp: OTP
         }));
         console.log("otp stored successfully");
      }
      catch (err) {
         console.log(err);
      }
   }

   static async get_otp(email:string) {
      const client = createClient();
      client.connect();
      client.on('error', err => console.log('Redis client error', err));

      if (await client.exists(email)) {
         const otp_details: any = await client.get(email);
         const userOTP = JSON.parse(otp_details);
         return userOTP.otp
      }
      else {
         return false;
      }
   }
}