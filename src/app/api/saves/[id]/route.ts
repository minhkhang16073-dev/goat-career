import { prisma } from "@/db/client";
import { NextResponse } from "next/server";

export const GET = async (_request: Request, { params }: { params: { id: string } }) => {
  const save = await prisma.saveSlot.findUnique({ where: { id: params.id } });
  if (!save) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({
    ...save,
    worldState: JSON.parse(save.worldStateJson),
  });
};

export const PUT = async (request: Request, { params }: { params: { id: string } }) => {
  const body = await request.json();
  const save = await prisma.saveSlot.update({
    where: { id: params.id },
    data: { worldStateJson: JSON.stringify(body.worldState) },
  });
  return NextResponse.json({
    ...save,
    worldState: body.worldState,
  });
};
