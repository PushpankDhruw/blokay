import { NextResponse } from "next/server";
import Models from "@/db/index";

let db = new Models();
const { Neuron, User }: any = db;

export async function POST(req: any) {
  const body = await req.json();
  let user = await User.findByToken(body._token);

  const result = await Neuron.findAll({
    where: {
      businessId: user.businessId,
    },
  });

  const list = result.map((n: any) => ({
    id: n.id,
    key: n.key,
    description: n.description,
    icon: n.icon,
    parentId: n.parentId,
  }));

  return NextResponse.json({
    data: {
      Neurons: list,
    },
  });
}
