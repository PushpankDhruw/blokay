import { NextResponse } from "next/server";
import Models from "@/db/index";

let db = new Models();
const { User, Session, Business }: any = db;

export async function POST(req: any) {
  const body = await req.json();

  let { username, password, email, companyName, name } = body.data;

  const currentUser = await User.findByUsername(username);
  if (currentUser) {
    return NextResponse.json({
      error: {
        message: "Exists user",
      },
    });
  }

  const business = await Business.create({
    name: companyName,
    coreToken: "",
  });

  const user = await User.create({
    name,
    username,
    password,
    email,
    businessId: business.id,
    rol: "admin",
  });

  await business.update({
    ownerId: user.id,
  });

  let session = await Session.createSession(user, "", "", null);

  let data = await user.loginData(session);

  return NextResponse.json({
    data: {
      User: data,
    },
  });
}
