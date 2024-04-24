import { NextResponse } from "next/server";
import Models from "@/db/index";

let db = new Models();
const { User }: any = db;

export async function POST(req: any) {
  const body = await req.json();

  let user = await User.findByToken(body._token);

  const result = await User.findOne({
    where: {
      id: body.data.userId,
      businessId: user.businessId,
    },
  });

  const userMap = {
    id: result.id,
    name: result.name,
    username: result.username,
    rol: result.rol,
    permissions: {},
  };

  return NextResponse.json({
    data: {
      User: userMap,
    },
  });
}
