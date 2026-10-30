import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { proof } from '@/config/site';

const { pullRequest } = proof;

export default function PullRequestPreview() {
  return (
    <figure>
      <Card className="gap-0 overflow-hidden p-0">
        <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
          <p className="text-sm font-medium">{pullRequest.title}</p>
          <Badge variant="outline" className="shrink-0">
            {pullRequest.sampleLabel}
          </Badge>
        </div>
        <pre className="overflow-x-auto border-b p-4 font-mono text-sm leading-6">
          <code>
            {pullRequest.removed.map((line) => (
              <span key={line} className="block text-muted-foreground">
                - {line}
              </span>
            ))}
            {pullRequest.added.map((line) => (
              <span key={line} className="block text-savings">
                + {line}
              </span>
            ))}
          </code>
        </pre>
        <Table>
          <TableHeader>
            <TableRow>
              {pullRequest.columns.map((column, index) => (
                <TableHead key={column} className={`px-4 ${index > 0 ? 'text-right' : ''}`}>
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pullRequest.rows.map((row) => (
              <TableRow key={row.check}>
                <TableCell className="px-4">{row.check}</TableCell>
                <TableCell className="px-4 text-right font-mono text-muted-foreground">{row.before}</TableCell>
                <TableCell className="px-4 text-right font-mono">{row.after}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <figcaption className="mt-3 text-sm text-muted-foreground">{pullRequest.note}</figcaption>
    </figure>
  );
}
