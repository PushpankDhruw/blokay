import { NextResponse } from "next/server";
import Models from "@/db/index";

let db = new Models();
const { Neuron, User }: any = db;

function stringtoKey(str: string) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, ".");

  return str;
}

export async function POST(req: any) {
  const body = await req.json();
  const data = body.data;

  let user = await User.findByToken(body._token);

  let neuron = await Neuron.create({
    businessId: user.businessId,
    icon: data.icon,
    description: data.name,
    key: stringtoKey(data.name),
    filters: [],
    synapse: "const fn = async (args: Args) => {}",
  });

  return NextResponse.json({
    data: {
      Neuron: {
        id: neuron.id,
      },
    },
  });
}
