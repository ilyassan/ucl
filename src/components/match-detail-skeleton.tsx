import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MatchDetailSkeleton() {
  return (
    <div>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="overview">Match Overview</TabsTrigger>
          <TabsTrigger value="lineups">Lineups</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-40" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <Skeleton className="h-6 w-12" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-5 w-full" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-40" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <Skeleton className="h-[100px] w-full" />
                    <Skeleton className="h-[200px] w-full" />
                    <Skeleton className="h-[300px] w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-full" />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <Skeleton className="h-32 w-32 rounded-full mb-4" />
                    <Skeleton className="h-6 w-40 mb-2" />
                    <Skeleton className="h-4 w-24 mb-4" />
                    <Skeleton className="h-4 w-32 mb-6" />

                    <div className="grid grid-cols-2 gap-4 w-full">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-16 w-full" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-24" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
