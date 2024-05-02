import { withUser } from "@/lib/withUser";
import { NextResponse } from "next/server";
import Models from "@/db/index";

let db = new Models();

const { Neuron }: any = db;

export const POST = withUser(async function ({ req, user }: any) {
  const body = await req.json();

  let { neuronId } = body.data;

  const neuron = await Neuron.findOne({
    where: {
      id: neuronId,
      businessId: user.businessId,
    },
  });

  return NextResponse.json({
    data: {
      Neuron: {
        id: neuron.id,
        createdAt: neuron.createdAt,
        key: neuron.key,
        description: neuron.description,
        filters: neuron.filters,
        synapse: neuron.synapse,
        history: neuron.history,
      },
    },
  });
});
