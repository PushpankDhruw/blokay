import { NextResponse } from "next/server";
import Models from "@/db/index";

let db = new Models();
const { Neuron, User } = db;

export async function POST(req) {
  // const body = await req.json();

  // let { user } = req;

  // let rol = await user.getRol();
  // let rolPermissions = await rol.getRolPermissions({
  //   include: [
  //     {
  //       model: RolPrivilege,
  //       required: true,
  //     },
  //   ],
  // });
  const body = await req.json();
  let user = await User.findByToken(body._token);

  const result = await Neuron.findAll({
    where: {
      businessId: user.businessId,
    },
  });

  const list = result.map((n) => ({
    id: n.id,
    key: n.key,
    description: n.description,
    icon: n.icon,
    parentId: n.parentId,
  }));

  return NextResponse.json({
    data: {
      Neurons: list,
    },
  });
}
