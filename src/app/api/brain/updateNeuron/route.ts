import { withUser } from "@/lib/withUser";
import { NextResponse } from "next/server";
import Models from "@/db/index";
import { transpileModule } from "./ts-js";
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

  let js = transpileModule(data.synapse);

  let toUpdate: any = {};
  if (js.diagnostics.length == 0) {
    toUpdate.synapse = data.synapse;
    toUpdate.executable = js.code;
  }

  if (data.filters) {
    toUpdate.filters = data.filters;
  }
  if (data.description) {
    toUpdate.description = data.description;
  }
  if (Object.keys(toUpdate).length > 0) {
    neuron = await neuron.update(toUpdate);
  }
  return NextResponse.json({
    data: {
      Result: {
        diagnostics: js.diagnostics,
      },
    },
  });
});
