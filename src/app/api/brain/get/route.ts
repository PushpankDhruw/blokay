import { NextResponse } from "next/server";
import Models from "@/db/index";

let db = new Models();

const { Neuron, User }: any = db;

export async function POST(req: any) {
  const body = await req.json();

  let { neuronId, neuronKey } = body.data;

  let user = await User.findByToken(body._token);

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
}
