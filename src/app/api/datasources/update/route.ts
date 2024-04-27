import { NextResponse } from "next/server";
import Models from "@/db/index";

let db = new Models();
const { User, Datasource }: any = db;

export async function POST(req: any) {
  const body = await req.json();
  let user = await User.findByToken(body._token);

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
}
