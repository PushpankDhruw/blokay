import { withUser } from "@/lib/withUser";
import { NextResponse } from "next/server";
import Models from "@/db/index";

let db = new Models();

const { View }: any = db;

export const POST = withUser(async function ({ req, user }: any) {
  const body = await req.json();

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
});
