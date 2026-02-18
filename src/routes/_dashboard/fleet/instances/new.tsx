import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '#/components/ui/card'
import { ArrowLeft, Cloud, Server, Shield } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_dashboard/fleet/instances/new')({
  component: NewInstanceWizard,
})

const providers = [
  {
    id: 'digitalocean',
    name: 'DigitalOcean',
    type: 'Cloud',
    icon: <Cloud className="w-5 h-5" />,
  },
  {
    id: 'hetzner',
    name: 'Hetzner',
    type: 'Cloud',
    icon: <Cloud className="w-5 h-5" />,
  },
  {
    id: 'aws',
    name: 'AWS',
    type: 'Cloud',
    icon: <Cloud className="w-5 h-5" />,
  },
  {
    id: 'byo',
    name: 'BYO Server',
    type: 'BYO',
    icon: <Server className="w-5 h-5" />,
  },
  {
    id: 'managed',
    name: 'Managed',
    type: 'Managed',
    icon: <Shield className="w-5 h-5" />,
  },
]

const regions: Record<string, { id: string; label: string }[]> = {
  digitalocean: [
    { id: 'nyc1', label: 'New York 1' },
    { id: 'nyc3', label: 'New York 3' },
    { id: 'sfo3', label: 'San Francisco 3' },
    { id: 'ams3', label: 'Amsterdam 3' },
    { id: 'sgp1', label: 'Singapore 1' },
  ],
  hetzner: [
    { id: 'eu-central', label: 'EU Central (Falkenstein)' },
    { id: 'eu-west', label: 'EU West (Helsinki)' },
    { id: 'us-east', label: 'US East (Ashburn)' },
  ],
  aws: [
    { id: 'us-east-1', label: 'US East (N. Virginia)' },
    { id: 'us-west-2', label: 'US West (Oregon)' },
    { id: 'eu-west-1', label: 'EU West (Ireland)' },
    { id: 'ap-southeast-1', label: 'Asia Pacific (Singapore)' },
  ],
}

function NewInstanceWizard() {
  const [name, setName] = useState('')
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  const availableRegions = selectedProvider ? (regions[selectedProvider] ?? []) : []

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <Link
          to="/fleet/instances"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Instances
        </Link>
        <h1 className="text-2xl font-bold text-white">Provision New Instance</h1>
        <p className="text-sm text-slate-400 mt-1">
          Deploy a new OpenClaw instance to your infrastructure
        </p>
      </div>

      {/* Instance Name */}
      <Card>
        <CardHeader>
          <CardTitle>Instance Name</CardTitle>
          <CardDescription>Choose a name for your new instance</CardDescription>
        </CardHeader>
        <CardContent>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. production-us-east"
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </CardContent>
      </Card>

      {/* Provider Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Provider</CardTitle>
          <CardDescription>
            Select your infrastructure provider
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {providers.map((provider) => (
              <button
                key={provider.id}
                type="button"
                onClick={() => {
                  setSelectedProvider(provider.id)
                  setSelectedRegion(null)
                }}
                className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-all ${
                  selectedProvider === provider.id
                    ? 'border-cyan-500 bg-cyan-500/10 text-white'
                    : 'border-slate-600 bg-slate-900 text-slate-300 hover:border-slate-500'
                }`}
              >
                <div
                  className={
                    selectedProvider === provider.id
                      ? 'text-cyan-400'
                      : 'text-slate-400'
                  }
                >
                  {provider.icon}
                </div>
                <div>
                  <div className="text-sm font-medium">{provider.name}</div>
                  <div className="text-xs text-slate-400">{provider.type}</div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Region Selection */}
      {availableRegions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Region</CardTitle>
            <CardDescription>
              Select the deployment region
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableRegions.map((region) => (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => setSelectedRegion(region.id)}
                  className={`rounded-lg border p-3 text-left text-sm transition-all ${
                    selectedRegion === region.id
                      ? 'border-cyan-500 bg-cyan-500/10 text-white'
                      : 'border-slate-600 bg-slate-900 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {region.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Provision Button */}
      <Card>
        <CardFooter className="pt-6">
          <button
            type="button"
            disabled={!name || !selectedProvider}
            className="w-full rounded-lg bg-cyan-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Provision Instance
          </button>
        </CardFooter>
      </Card>
    </div>
  )
}
