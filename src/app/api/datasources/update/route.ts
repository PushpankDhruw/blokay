import { withUser } from "@/lib/withUser";
import { NextResponse } from "next/server";
import Models from "@/db/index";

let db = new Models();
const { Datasource }: any = db;

export const POST = withUser(async function ({ user, req }: any) {
  const body = await req.json();

  const datasource = await Datasource.findOne({
    where: {
      id: body.data.datasourceId,
      businessId: user.businessId,
    },
  });

  await datasource.update({
    type: body.data.type,
    name: body.data.name,
    config: {
      database: body.data.config,
    },
  });

  return NextResponse.json({
    data: {},
  });
});
