import { NextResponse } from "next/server";
import Models from "@/db/index";

let db = new Models();
const { View, User } = db;

export async function POST(req) {
  const body = await req.json();

  let user = await User.findByToken(body._token);

  const result = await View.findAll({
    where: {
      businessId: user.businessId,
    },
  });

  const list = result.map((n) => ({
    id: n.id,
    name: n.name,
    icon: n.icon,
    slug: n.slug,
  }));

  return NextResponse.json({
    data: {
      Views: list,
    },
  });
}
