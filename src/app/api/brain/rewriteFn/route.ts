import { NextResponse } from "next/server";
import Models from "@/db/index";
import CoreAPI from "@/app/services/core";
import { transpileModule } from "../updateNeuron/ts-js";

let db = new Models();
const { Neuron, User, Datasource }: any = db;

export async function POST(req: any) {
  const body = await req.json();
  const data = body.data;

  let user = await User.findByToken(body._token);
  let business = await user.getBusiness();

  let coreApi = new CoreAPI(business.coreToken);

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

  let fields = neuron.filters?.fields || [];
  // only send needed data Neuron
  let neuronsList = neurons.map((n: any) => ({
    id: n.id,
    key: n.key,
    description: n.description,
  }));
  let result = await coreApi.getFn(
    neuron.description,
    neuron.synapse,
    data.prompt || "",
    fields,
    datasource.structure, // We Only share the database metadata (never your credentials or data)
    neuronsList
  );

  let js = transpileModule(result.synapse);

  if (result) {
    let toUpdate: any = {
      synapse: result.synapse,
      executable: js.code,
      history: [
        ...neuron.history,
        { type: "user", message: data.prompt },
        { type: "system", message: "Ok" },
      ],
    };
    if (!neuron.description) {
      toUpdate.description = result.description;
    }
    neuron = await neuron.update(toUpdate);
  }

  return NextResponse.json({
    data: {
      Result: {
        fn: neuron.id,
      },
    },
  });
}
