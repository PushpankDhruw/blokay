import { NextResponse } from "next/server";
import Models from "@/db/index";
import OpenAI from "@/app/services/openai";
import { transpileModule } from "./ts-js";

let db = new Models();
const { Neuron, User, Datasource }: any = db;

export async function POST(req: any) {
  const body = await req.json();
  const data = body.data;

  let user = await User.findByToken(body._token);

  let openai = new OpenAI();

  const datasource = await Datasource.findOne({
    where: {
      businessId: user.businessId,
    },
  });

  let neuron = await Neuron.findOne({
    where: {
      id: data.neuronId,
      businessId: user.businessId,
    },
  });

  let neurons = await Neuron.findAll({
    where: {
      businessId: neuron.businessId,
    },
  });

  let result = await openai.getFn(
    neuron.description,
    neuron.synapse,
    data.prompt || "",
    neuron.filters?.fields || [],
    datasource.structure,
    neurons
  );

  let js = transpileModule(result);
  console.log(js.code);

  let description = await openai.descriptionFn(result);

  if (result) {
    neuron = await neuron.update({
      synapse: result,
      executable: js.code,
      description,
      history: [
        ...neuron.history,
        { type: "user", message: data.prompt },
        { type: "system", message: "Ok" },
      ],
    });
  }

  return NextResponse.json({
    data: {
      Result: {
        fn: neuron.id,
      },
    },
  });
}