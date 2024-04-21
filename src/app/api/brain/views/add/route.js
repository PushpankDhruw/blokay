import { NextResponse } from "next/server";
import Models from "@/db/index";

let db = new Models();
const { View, User } = db;

function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
}

export async function POST(req) {
  const body = await req.json();
  const data = body.data;

  let user = await User.findByToken(body._token);

  let view = await View.create({
    businessId: user.businessId,
    name: data.name,
    layout: [],
    slug: string_to_slug(data.name),
  });

  return NextResponse.json({
    View: {
      id: view.id,
    },
  });
}
