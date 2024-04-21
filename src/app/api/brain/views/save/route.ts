import { NextResponse } from "next/server";
import Models from "@/db/index";

let db = new Models();
const { View, User }: any = db;

export async function POST(req: any) {
  const body = await req.json();
  const data = body.data;
  let user = await User.findByToken(body._token);

  const view = await View.findOne({
    where: {
      businessId: user.businessId,
      id: data.id,
    },
  });

  const toUpdate: any = {};
  if (data.layout) {
    toUpdate.layout = data.layout;
  }

  if (data.name) {
    toUpdate.name = data.name;
  }

  view.update(toUpdate);
  return NextResponse.json({});
}
