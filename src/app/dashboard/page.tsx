import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { db } from '@/db';
import { formatPrice } from '@/lib/utils';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { notFound } from 'next/navigation';
import StatusDropdown from './StatusDropdown';

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  if (!user || user.email !== ADMIN_EMAIL) {
    return notFound();
  }

  const orders = await db.order.findMany({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
      shippingAddress: true,
    },
  });

  const lastWeekSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    _sum: {
      amount: true,
    },
  });

  const lastMonthSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    },
    _sum: {
      amount: true,
    },
  });

  const WEEKLY_GOAL = 500;
  const MONTHLY_GOAL = 2500;

  return (
    <div className='flex min-h-screen w-full bg-[#F3F8F2]'> {/* Lighter Green Background */}
      <div className='max-w-7xl w-full mx-auto flex flex-col sm:gap-6 sm:py-8'>
        <div className='flex flex-col gap-16'>
          <div className='grid gap-6 sm:grid-cols-2'>
            <Card className='border border-[#A7B59E] shadow-sm bg-white'>
              <CardHeader className='pb-2'>
                <CardDescription className='text-[#5B744B]'>Last Week</CardDescription>
                <CardTitle className='text-4xl text-[#5B744B]'>
                  {formatPrice(lastWeekSum._sum.amount ?? 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-sm text-[#799567]'>
                  of {formatPrice(WEEKLY_GOAL)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  value={((lastWeekSum._sum.amount ?? 0) * 100) / WEEKLY_GOAL}
                  className='bg-[#D5E8DC] barClassName bg-[#5B744B]'  // Corrected className
                />
              </CardFooter>
            </Card>
            <Card className='border border-[#A7B59E] shadow-sm bg-white'>
              <CardHeader className='pb-2'>
                <CardDescription className='text-[#5B744B]'>Last Month</CardDescription>
                <CardTitle className='text-4xl text-[#5B744B]'>
                  {formatPrice(lastMonthSum._sum.amount ?? 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-sm text-[#799567]'>
                  of {formatPrice(MONTHLY_GOAL)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  value={((lastMonthSum._sum.amount ?? 0) * 100) / MONTHLY_GOAL}
                  className='bg-[#D5E8DC] barClassName bg-[#5B744B]'  // Corrected className
                />
              </CardFooter>
            </Card>
          </div>

          <h1 className='text-4xl font-bold tracking-tight text-[#5B744B]'>Incoming orders</h1>

          <Table className='border border-[#A7B59E] shadow-sm'>
            <TableHeader className='bg-[#D5E8DC]'>
              <TableRow>
                <TableHead className='text-[#5B744B]'>Customer</TableHead>
                <TableHead className='hidden sm:table-cell text-[#5B744B]'>Status</TableHead>
                <TableHead className='hidden sm:table-cell text-[#5B744B]'>
                  Purchase date
                </TableHead>
                <TableHead className='text-right text-[#5B744B]'>Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
            {/* // @ts-ignore */}
              {orders.map((order) => (
                <TableRow key={order.id} className='bg-white border-b border-[#A7B59E]'>
                  <TableCell>
                    <div className='font-medium text-[#5B744B]'>
                      {order.shippingAddress?.name}
                    </div>
                    <div className='hidden text-sm text-[#799567] md:inline'>
                      {order.user.email}
                    </div>
                  </TableCell>
                  <TableCell className='hidden sm:table-cell'>
                    <StatusDropdown id={order.id} orderStatus={order.status} />
                  </TableCell>
                  <TableCell className='hidden md:table-cell text-[#799567]'>
                    {order.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell className='text-right text-[#5B744B]'>
                    {formatPrice(order.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Page;
