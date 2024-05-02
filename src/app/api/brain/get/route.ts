import { withUser } from "@/lib/withUser";
import { NextResponse } from "next/server";
import Models from "@/db/index";

let db = new Models();

const { Neuron }: any = db;

export const POST = withUser(async function ({ req, user }: any) {
  const body = await req.json();

  let { neuronId, neuronKey } = body.data;

  let queryBuilder: any = {
    where: {
      businessId: user.businessId,
    },
  };
  if (neuronId) {
    queryBuilder.where.id = neuronId;
  }

  if (neuronKey) {
    queryBuilder.where.key = neuronKey;
  }

  const neuron = await Neuron.findOne(queryBuilder);

  return NextResponse.json({
    data: {
      Neuron: {
        id: neuron.id,
        createdAt: neuron.createdAt,
        key: neuron.key,
        description: neuron.description,
        filters: neuron.filters,
      },
    },
  });
});
