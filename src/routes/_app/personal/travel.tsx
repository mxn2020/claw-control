import { DemoDataBanner } from '#/components/ui/demo-data-banner'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Plane, MapPin, Calendar, FileText, Plus } from 'lucide-react'

export const Route = createFileRoute('/_app/personal/travel')({
  component: PersonalTravel,
})

const upcomingTrips = [
  {
    id: 't1',
    destination: 'Tokyo, Japan',
    dates: 'Feb 10 — Feb 20, 2025',
    status: 'confirmed' as const,
    flights: 'LAX → NRT (JAL 61)',
    hotel: 'Park Hyatt Tokyo',
    activities: 8,
  },
  {
    id: 't2',
    destination: 'London, UK',
    dates: 'Mar 5 — Mar 9, 2025',
    status: 'planning' as const,
    flights: 'Pending',
    hotel: 'TBD',
    activities: 3,
  },
  {
    id: 't3',
    destination: 'Aspen, Colorado',
    dates: 'Mar 22 — Mar 26, 2025',
    status: 'confirmed' as const,
    flights: 'LAX → ASE (United 1842)',
    hotel: 'The Little Nell',
    activities: 5,
  },
  {
    id: 't4',
    destination: 'Barcelona, Spain',
    dates: 'May 1 — May 8, 2025',
    status: 'idea' as const,
    flights: 'Not booked',
    hotel: 'Not booked',
    activities: 0,
  },
]

const documents = [
  { name: 'Passport', expiry: 'Aug 2028', status: 'valid' as const },
  { name: 'Global Entry Card', expiry: 'Dec 2026', status: 'valid' as const },
  { name: 'Travel Insurance Policy', expiry: 'Mar 2025', status: 'expiring' as const },
  { name: 'Japan Rail Pass Voucher', expiry: 'Feb 2025', status: 'valid' as const },
  { name: 'International Driving Permit', expiry: 'Jun 2025', status: 'valid' as const },
]

const statusColor = {
  confirmed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  planning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  idea: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
}

const docStatusColor = {
  valid: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  expiring: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
}

function PersonalTravel() {
  return (
    <div className="space-y-6">
      <DemoDataBanner />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Travel</h1>
          <p className="text-sm text-slate-400 mt-1">
            Upcoming trips, planning workspace, and travel documents
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Plan Trip
        </Button>
      </div>

      {/* Trip Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {upcomingTrips.map((trip) => (
          <Card key={trip.id} className="hover:border-cyan-500/30 transition-all cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin size={16} className="text-cyan-400" />
                  {trip.destination}
                </CardTitle>
                <Badge className={statusColor[trip.status]}>{trip.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar size={14} className="text-slate-500" />
                  <span className="text-slate-300">{trip.dates}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Plane size={14} className="text-slate-500" />
                  <span className="text-slate-300">{trip.flights}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-700/60">
                  <span>Hotel: {trip.hotel}</span>
                  <span>{trip.activities} activities planned</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Travel Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            Travel Documents Vault
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {documents.map((doc) => (
              <div key={doc.name} className="flex items-center justify-between rounded-md bg-slate-800/50 px-3 py-2.5">
                <div>
                  <p className="text-sm text-white">{doc.name}</p>
                  <p className="text-xs text-slate-500">Expires: {doc.expiry}</p>
                </div>
                <Badge className={`text-xs ${docStatusColor[doc.status]}`}>{doc.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
