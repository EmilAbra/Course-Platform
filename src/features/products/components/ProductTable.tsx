import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPlural, formatPrice } from "@/lib/formatters";
import { EyeIcon, LockIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { ActionButton } from "@/components/ActionButton";
import { ProductStatuses } from "@/drizzle/schema";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { deleteProduct } from "../actions/products";

export function ProductTable({
  products,
}: {
  products: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    priceInDollars: number;
    status: ProductStatuses;
    coursesCount: number;
    customersCount: number;
  }[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            {formatPlural(products.length, {
              singular: "product",
              plural: "products",
            })}
          </TableHead>
          <TableHead>Customers</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <div className="flex items-center gap-4">
                <Image
                  className="object-cover rounded size-12"
                  src={product.imageUrl}
                  alt={product.name}
                  width={192}
                  height={192}
                />
                <div className="flex flex-col gap-1">
                  <div className="font-semibold">{product.name}</div>
                  <div className="text-muted-foreground">
                    {formatPlural(product.coursesCount, {
                      singular: "product",
                      plural: "products",
                    })}{" "}
                    • {formatPrice(product.priceInDollars)}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>{product.customersCount}</TableCell>
            <TableCell>
              <Badge className="inline-flex itemes-center gap-2">
                {getStatusIcon(product.status)} {product.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button asChild>
                  <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                </Button>
                <ActionButton
                  variant="destructiveOutline"
                  action={deleteProduct.bind(null, product.id)}
                  requireAreYouSure
                >
                  <Trash2Icon />
                  <span className="sr-only">Delete</span>
                </ActionButton>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function getStatusIcon(status: ProductStatuses) {
  const Icon = {
    public: EyeIcon,
    private: LockIcon,
  }[status];

  return <Icon className="size-4" />;
}
