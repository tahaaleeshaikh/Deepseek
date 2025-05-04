import { Webhook } from "svix";
import dbConnect from "@/app/config/db";
import User from "@/app/models/User";
export async function POST(req) {

    const wh=new Webhook(process.env.SIGNING_SECRET);
    const headerPayLoad=await headers();
    const svixHeaders={
        "svix-id": headerPayLoad.get("svix-id"),
        "svix-signature": headerPayLoad.get("svix-signature"),
    };
    const Payload=await req.json();
    const body=JSON.stringify(Payload);
    const{data, type}=wh.verify(body,svixHeaders);

    const userData={
        _id:data.id,
        name:`${data.first_name} ${data.last_name}`,
        email:data.email_addresses[0].email_address,
        image:data.image_url,
    };
    await dbConnect();
    switch(type){
        case "user.created":
            await User.create(userData);
            break;
        case "user.updated":
                await User.findByIdAndUpdate (data.id,userData);
                break;
      case "user.deleted":
                    await User.findByIdAndDelete (data.id);
                    break;
        
        default:
            console.log("Unknown event type",type);
    }
    return nextResponse.json({status:"success"});
}