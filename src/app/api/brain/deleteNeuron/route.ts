import { NextResponse } from "next/server";
import Models from "@/db/index";
let db = new Models();
const { Neuron, User }: any = db;

export async function POST(req: any) {
  const body = await req.json();
  const data = body.data;

  let user = await User.findByToken(body._token);

  let neuron = await Neuron.findOne({
    where: {
      id: data.neuronId,
      businessId: user.businessId,
    },
  });

  await neuron.destroy();

  return NextResponse.json({
    data: {},
  });
}
