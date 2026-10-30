import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { preview } from '@/config/site';

const { dashboard, sampleLabel, note } = preview;

export default function ProductPreview() {
  return (
    <figure>
      <Card className="gap-0 overflow-hidden p-0 shadow-2xl">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <p className="text-sm font-medium">{dashboard.title}</p>
          <Badge variant="outline">{sampleLabel}</Badge>
        </div>
        <dl className="grid grid-cols-3 border-b">
          {dashboard.stats.map((stat, index) => (
            <div key={stat.label} className="border-r p-4 last:border-r-0">
              <dt className="text-xs text-muted-foreground sm:text-sm">{stat.label}</dt>
              <dd
                className={`mt-1 font-mono text-sm tracking-tight sm:text-2xl ${index === 2 ? 'text-savings' : ''}`}
              >
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
        <Table>
          <TableHeader>
            <TableRow>
              {dashboard.columns.map((column, index) => (
                <TableHead key={column} className={`px-4 ${index === 1 ? 'hidden sm:table-cell' : ''} ${index > 1 ? 'text-right' : ''}`}>
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {dashboard.rows.map((row) => (
              <TableRow key={row.feature}>
                <TableCell className="px-4">{row.feature}</TableCell>
                <TableCell className="hidden px-4 text-muted-foreground sm:table-cell">{row.team}</TableCell>
                <TableCell className="px-4 text-right font-mono">{row.spend}</TableCell>
                <TableCell className="px-4 text-right font-mono text-savings">{row.change}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="border-t px-4 py-3 text-sm text-muted-foreground">{dashboard.alert}</p>
      </Card>
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">{note}</figcaption>
    </figure>
  );
}
