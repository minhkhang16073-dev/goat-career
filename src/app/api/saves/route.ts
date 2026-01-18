import { prisma } from "@/db/client";
import { NextResponse } from "next/server";

export const GET = async () => {
  const saves = await prisma.saveSlot.findMany({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json(
    saves.map((save) => ({
      ...save,
      worldState: JSON.parse(save.worldStateJson),
    }))
  );
};

export const POST = async (request: Request) => {
  const body = await request.json();
  const save = await prisma.saveSlot.create({
    data: {
      name: body.name,
      worldStateJson: JSON.stringify(body.worldState),
    },
  });
  return NextResponse.json({
    ...save,
    worldState: body.worldState,
  });
};
