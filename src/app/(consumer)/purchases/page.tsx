import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { db } from "@/drizzle/db";
import { PurchaseTable } from "@/drizzle/schema";
import {
  UserPurchaseTable,
  UserPurchaseTableSkeleton,
} from "@/features/purchases/components/userPurchaseTable";
import { getPurchaseUserTag } from "@/features/purchases/db/cache";
import { getCurrentUser } from "@/services/clerk";
import { desc, eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import Link from "next/link";
import { Suspense } from "react";

export default function PurchasesPage() {
  return (
    <div className="container my-6">
      <PageHeader title="Purchase History" />
      <Suspense fallback={<UserPurchaseTableSkeleton />}>
        <SuspenseBoundary />
      </Suspense>
    </div>
  );
}

async function SuspenseBoundary() {
  const { user, redirectToSignIn } = await getCurrentUser();
  if (user == null) return redirectToSignIn();

  const purchases = await getPurchases(user.id);

  if (purchases.length === 0) {
    return (
      <div className="flex flex-col gap-2 items-start">
        You have made no purchases yet
        <Button asChild size="lg">
          <Link href="/">Browse Courses</Link>
        </Button>
      </div>
    );
  }

  return <UserPurchaseTable purchases={purchases} />;
}

async function getPurchases(userId: string) {
  "use cache";
  cacheTag(getPurchaseUserTag(userId));

  return await db.query.PurchaseTable.findMany({
    where: eq(PurchaseTable.userId, userId),
    columns: {
      id: true,
      pricePaidInCents: true,
      refundedAt: true,
      productDetails: true,
      createdAt: true,
    },
    orderBy: desc(PurchaseTable.createdAt),
  });
}
