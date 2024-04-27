import { NextResponse } from "next/server";
import Models from "@/db/index";

let db = new Models();
const { User, Datasource }: any = db;

export async function POST(req: any) {
  const body = await req.json();
  let user = await User.findByToken(body._token);

  const result = await Datasource.findAll({
    where: {
      businessId: user.businessId,
    },
  });

  const list = result.map((n: any) => ({
    id: n.id,
    type: n.type,
    name: n.name,
    config: n.config,
    lastUseAt: n.lastUseAt,
  }));

  return NextResponse.json({
    data: {
      Datasource: list,
    },
  });
}
