import { withUser } from "@/lib/withUser";
import { NextResponse } from "next/server";
import Models from "@/db/index";

let db = new Models();
const { User, Datasource }: any = db;

export const POST = withUser(async function ({ req, user }: any) {
  const body = await req.json();

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
});
