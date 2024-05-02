import { withUser } from "@/lib/withUser";
import { NextResponse } from "next/server";
import Models from "@/db/index";
let db = new Models();
const { Neuron, User }: any = db;

export const POST = withUser(async function ({ req, user }: any) {
  const body = await req.json();
  const data = body.data;

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
});
