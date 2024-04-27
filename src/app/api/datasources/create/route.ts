import { NextResponse } from "next/server";
import Models from "@/db/index";

let db = new Models();
const { User, Datasource }: any = db;

export async function POST(req: any) {
  const body = await req.json();
  let user = await User.findByToken(body._token);

  await Datasource.create({
    type: body.data.type,
    name: body.data.name,
    businessId: user.businessId,
    config: {
      database: body.data.config,
    },
  });

  return NextResponse.json({
    data: {},
  });
}
