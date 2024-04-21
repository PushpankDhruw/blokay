import { NextResponse } from "next/server";
import Models from "@/db/index";

let db = new Models();

const { View, User }: any = db;

export async function POST(req: any) {
  const body = await req.json();

  let user = await User.findByToken(body._token);

  let { slug } = body.data;

  const neuron = await View.findOne({
    where: {
      businessId: user.businessId,
      slug,
    },
  });

  return NextResponse.json({
    data: {
      View: {
        id: neuron.id,
        slug: neuron.slug,
        name: neuron.name,
        icon: neuron.icon,
        layout: neuron.layout,
      },
    },
  });
}
