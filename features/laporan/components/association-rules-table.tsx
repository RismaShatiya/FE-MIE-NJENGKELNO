import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AssociationRule } from "../types/laporan";

interface AssociationRulesTableProps {
  data: AssociationRule[];
}

export default function AssociationRulesTable({
  data,
}: AssociationRulesTableProps) {
  return (
    <Card className="min-w-0 overflow-hidden border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold">
          Hasil Aturan Asosiasi Terbaru
        </CardTitle>
      </CardHeader>

      <CardContent className="px-0 pb-0">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#920000] hover:bg-[#920000]">
                <TableHead className="min-w-[250px] text-white">
                  Kombinasi Menu
                </TableHead>

                <TableHead className="text-center text-white">
                  Support
                </TableHead>

                <TableHead className="text-center text-white">
                  Confidence
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.length > 0 ? (
                data.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">
                      {rule.kombinasiMenu.join(" → ")}
                    </TableCell>

                    <TableCell className="text-center">
                      {rule.support}%
                    </TableCell>

                    <TableCell className="text-center">
                      {rule.confidence}%
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="h-32 text-center text-muted-foreground"
                  >
                    Belum ada hasil aturan asosiasi.
                    Silakan jalankan analisis Apriori.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}