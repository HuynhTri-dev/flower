"use client";

import {
    Button,
    InputField,
    SelectField,
    Checkbox,
    Radio,
    Switch,
    Textarea,
    DateTimePicker
} from "../../component/common";
import { Mail, Lock, Search, User, Eye, EyeOff, Globe } from "lucide-react";
import { useState } from "react";

export default function UILibrarys() {
    // State examples for controlled components
    const [switchEnabled, setSwitchEnabled] = useState(false);
    const [accentSwitchEnabled, setAccentSwitchEnabled] = useState(true);
    const [selectedRadio, setSelectedRadio] = useState("option1");

    return (
        <div className="flex min-h-screen flex-col items-center justify-start bg-gray-50 font-sans gap-8 p-10">
            <div className="w-full max-w-5xl flex flex-col gap-16 pb-20">
                <div className="text-center mb-4">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Flower UI Kit</h1>
                    <p className="text-gray-500">A collection of beautiful, reusable components.</p>
                </div>

                {/* Buttons Section */}
                <section>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-primary rounded-full"></span> Buttons
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Primary Column */}
                        <div className="flex flex-col gap-4 items-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">Primary Variants</h3>
                            <Button variant="primary" size="sm">Small Button</Button>
                            <Button variant="primary" size="md">Medium Button</Button>
                            <Button variant="primary" size="lg">Large Button</Button>
                            <Button variant="primary" isLoading>Loading State</Button>
                        </div>

                        {/* Secondary & Accent Column */}
                        <div className="flex flex-col gap-4 items-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">Themed Variants</h3>
                            <Button variant="secondary">Secondary Button</Button>
                            <Button variant="accent">Accent Button</Button>
                            <Button variant="accent" className="rounded-full">Rounded Full</Button>
                            <div className="flex gap-2 w-full">
                                <Button variant="primary" className="flex-1">Save</Button>
                                <Button variant="secondary" className="flex-1">Cancel</Button>
                            </div>
                        </div>

                        {/* Outline & Ghost Column */}
                        <div className="flex flex-col gap-4 items-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">Minimal Variants</h3>
                            <Button variant="outline" className="w-full">Outline Button</Button>
                            <Button variant="ghost" className="w-full">Ghost Button</Button>
                            <Button variant="primary" disabled className="w-full">Disabled</Button>
                        </div>
                    </div>
                </section>

                {/* Inputs Section */}
                <section>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-primary rounded-full"></span> Data Entry
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column: Inputs & Selects */}
                        <div className="space-y-8">
                            {/* Standard Inputs */}
                            <div className="flex flex-col gap-6 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Common Fields</h3>

                                <InputField
                                    label="Full Name"
                                    placeholder="e.g. John Doe"
                                    fullWidth
                                />
                                <InputField
                                    label="Email Address"
                                    type="email"
                                    placeholder="name@company.com"
                                    prefix={<User className="w-4 h-4" />}
                                    fullWidth
                                />
                                <SelectField
                                    label="Role"
                                    placeholder="Select a role"
                                    options={["Product Designer", "Developer", "Manager"]}
                                    fullWidth
                                />
                            </div>

                            {/* Textarea */}
                            <div className="flex flex-col gap-6 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Long Text</h3>
                                <Textarea
                                    label="Bio"
                                    placeholder="Tell us a little about yourself..."
                                    helperText="This box will auto-expand as you type."
                                />
                            </div>
                        </div>

                        {/* Right Column: Special Inputs & Toggles */}
                        <div className="space-y-8">
                            {/* Date & Time */}
                            <div className="flex flex-col gap-6 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Date & Time Helpers</h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <DateTimePicker
                                        label="Start Date"
                                    />
                                    <DateTimePicker
                                        label="Start Time"
                                        type="time"
                                    />
                                </div>
                                <DateTimePicker
                                    label="Event Schedule"
                                    type="datetime-local"
                                    helperText="Select the full date and time of the event."
                                />
                            </div>

                            {/* Switches & Checks */}
                            <div className="flex flex-col gap-6 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Selection Controls</h3>

                                {/* Switches */}
                                <div className="flex flex-col gap-4">
                                    <Switch
                                        variant="primary"
                                        label="Daisy (Primary)"
                                        description="Uses primary color and flower icon."
                                        checked={switchEnabled}
                                        onChange={(e) => setSwitchEnabled(e.target.checked)}
                                    />
                                    <Switch
                                        variant="accent"
                                        label="Rose (Accent)"
                                        description="Uses accent color and rose icon."
                                        checked={accentSwitchEnabled}
                                        onChange={(e) => setAccentSwitchEnabled(e.target.checked)}
                                    />
                                    <Switch
                                        label="Disabled Switch"
                                        disabled
                                    />
                                </div>

                                <div className="h-px bg-gray-100 my-2" />

                                {/* Checkboxes */}
                                <div className="flex flex-col gap-3">
                                    <Checkbox
                                        label="Remember me"
                                        defaultChecked
                                    />
                                    <Checkbox
                                        label="I agree to the Terms of Service"
                                        description="Read our terms carefully."
                                        error="You must agree to continue."
                                    />
                                </div>

                                <div className="h-px bg-gray-100 my-2" />

                                {/* Radios */}
                                <div className="flex flex-col gap-3">
                                    <p className="text-sm font-medium text-gray-700">Notification Preference</p>
                                    <Radio
                                        name="notif"
                                        label="Instant"
                                        checked={selectedRadio === "option1"}
                                        onChange={() => setSelectedRadio("option1")}
                                    />
                                    <Radio
                                        name="notif"
                                        label="Daily Summary"
                                        checked={selectedRadio === "option2"}
                                        onChange={() => setSelectedRadio("option2")}
                                    />
                                    <Radio
                                        name="notif"
                                        label="Weekly Digest"
                                        description="Get a summary every Monday."
                                        checked={selectedRadio === "option3"}
                                        onChange={() => setSelectedRadio("option3")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
