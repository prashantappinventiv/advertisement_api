import { createClient } from "redis";


const client = createClient();
client.connect();
client.on('error', err => console.log('Redis client error', err));

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