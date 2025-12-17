import { Button } from "../component/common";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 font-sans gap-8 p-10">
      <h1 className="text-4xl font-bold text-primary mb-8">Flower UI Kit</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {/* Primary Column */}
        <div className="flex flex-col gap-4 items-center p-6 bg-white rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold text-text-dark">Primary</h2>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium Base</Button>
          <Button variant="primary" size="lg">Large Action</Button>
          <Button variant="primary" isLoading>Loading</Button>
        </div>

        {/* Secondary & Accent Column */}
        <div className="flex flex-col gap-4 items-center p-6 bg-white rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold text-text-dark">Themed</h2>
          <Button variant="secondary">Secondary (Ice Mint)</Button>
          <Button variant="accent">Accent (Fresh Coral)</Button>
          <Button variant="accent" className="rounded-full">Rounded Full</Button>
        </div>

        {/* Outline & Ghost Column */}
        <div className="flex flex-col gap-4 items-center p-6 bg-white rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold text-text-dark">Minimal</h2>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </div>
    </div>
  );
}
