import { NextResponse } from "next/server";
import Models from "@/db/index";

let db = new Models();
const { View, ViewGroup, User }: any = db;

export async function POST(req: any) {
  const body = await req.json();

  let user = await User.findByToken(body._token);

  const result = await View.findAll({
    include: [
      {
        model: ViewGroup,
        required: false,
      },
    ],
    where: {
      businessId: user.businessId,
    },
  });

  const list = result.reduce((ac: any, n: any) => {
    if (!ac[n.viewGroupId]) {
      ac[n.viewGroupId] = {
        id: n.viewGroupId,
        name: n.ViewGroup?.name || null,
        Views: [],
      };
    }
    ac[n.viewGroupId].Views.push({
      id: n.id,
      name: n.name,
      icon: n.icon,
      slug: n.slug,
    });

    return ac;
  }, {});

  return NextResponse.json({
    data: {
      Views: Object.values(list),
    },
  });
}
