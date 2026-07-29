import { useState } from "react";
import {
Shield,
Bell,
Palette,
Globe,
Save,
RotateCcw,
} from "lucide-react";

function Settings({ onBack }){

const [settings,setSettings]=useState({

name:"Professor John Doe",

email:"faculty@campusos.ai",

phone:"9876543210",

department:"Artificial Intelligence & Machine Learning",

designation:"Assistant Professor",

notifications:true,

assignmentAlerts:true,

attendanceAlerts:true,

placementAlerts:true,

darkMode:false,

compactMode:false,

language:"English",

timezone:"Asia/Kolkata",

dateFormat:"DD/MM/YYYY",

});

const handleChange=(e)=>{

setSettings({

...settings,

[e.target.name]:e.target.value,

});

};

const toggle=(key)=>{

setSettings({

...settings,

[key]:!settings[key],

});

};

const saveSettings=()=>{

alert("Settings Saved Successfully!");

};

return(

<div className="min-h-screen bg-gray-100 p-8">

<button
onClick={onBack}
className="mb-6 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
>
← Back
</button>

<div className="rounded-3xl bg-white p-8 shadow-xl">

<h1 className="text-3xl font-bold">
Settings
</h1>

<p className="mt-2 text-gray-500">
Manage your Faculty Portal preferences.
</p>

<div className="mt-8 grid gap-5 md:grid-cols-4">

<div className="rounded-xl bg-blue-50 p-5">
<p>CampusOS</p>
<h2 className="text-xl font-bold">Version 1.0</h2>
</div>

<div className="rounded-xl bg-green-50 p-5">
<p>Database</p>
<h2 className="text-xl font-bold">Firebase</h2>
</div>

<div className="rounded-xl bg-purple-50 p-5">
<p>Portal</p>
<h2 className="text-xl font-bold">Faculty</h2>
</div>

<div className="rounded-xl bg-yellow-50 p-5">
<p>Last Login</p>
<h2 className="text-xl font-bold">Today</h2>
</div>

      </div>

      {/* Account Information */}

      <div className="mt-10">

        <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold">
          <Shield size={22}/>
          Account Information
        </h2>

        <div className="grid gap-5 md:grid-cols-2">

          <input
            name="name"
            value={settings.name}
            onChange={handleChange}
            placeholder="Faculty Name"
            className="rounded-xl border p-3"
          />

          <input
            name="email"
            value={settings.email}
            readOnly
            className="rounded-xl border bg-gray-100 p-3"
          />

          <input
            name="phone"
            value={settings.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="rounded-xl border p-3"
          />

          <input
            name="department"
            value={settings.department}
            onChange={handleChange}
            placeholder="Department"
            className="rounded-xl border p-3"
          />

          <input
            name="designation"
            value={settings.designation}
            onChange={handleChange}
            placeholder="Designation"
            className="rounded-xl border p-3 md:col-span-2"
          />

        </div>

      </div>

      {/* Notifications */}

      <div className="mt-10">

        <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold">
          <Bell size={22}/>
          Notifications
        </h2>

        <div className="space-y-4">

          {[
            ["notifications","Enable Notifications"],
            ["assignmentAlerts","Assignment Alerts"],
            ["attendanceAlerts","Attendance Alerts"],
            ["placementAlerts","Placement Updates"],
          ].map(([key,label])=>(

            <div
              key={key}
              className="flex items-center justify-between rounded-xl border p-4"
            >

              <span>{label}</span>

              <input
                type="checkbox"
                checked={settings[key]}
                onChange={()=>toggle(key)}
              />

            </div>

          ))}

        </div>

      </div>

      {/* Appearance */}

      <div className="mt-10">

        <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold">
          <Palette size={22}/>
          Appearance
        </h2>

        <div className="space-y-4">

          <div className="flex items-center justify-between rounded-xl border p-4">

            <span>Dark Mode</span>

            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={()=>toggle("darkMode")}
            />

          </div>

          <div className="flex items-center justify-between rounded-xl border p-4">

            <span>Compact Mode</span>

            <input
              type="checkbox"
              checked={settings.compactMode}
              onChange={()=>toggle("compactMode")}
            />

          </div>

        </div>

      </div>

      {/* Preferences */}

      <div className="mt-10">

        <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold">
          <Globe size={22}/>
          Preferences
        </h2>

        <div className="grid gap-5 md:grid-cols-3">

          <select
            name="language"
            value={settings.language}
            onChange={handleChange}
            className="rounded-xl border p-3"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Marathi</option>
          </select>

          <select
            name="timezone"
            value={settings.timezone}
            onChange={handleChange}
            className="rounded-xl border p-3"
          >
            <option>Asia/Kolkata</option>
            <option>UTC</option>
          </select>

          <select
            name="dateFormat"
            value={settings.dateFormat}
            onChange={handleChange}
            className="rounded-xl border p-3"
          >
            <option>DD/MM/YYYY</option>
            <option>MM/DD/YYYY</option>
          </select>

        </div>

      </div>

      {/* Security */}

      <div className="mt-10">

        <h2 className="mb-5 text-2xl font-bold">
          Security
        </h2>

        <div className="flex flex-wrap gap-4">

          <button className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
            Change Password
          </button>

          <button className="rounded-xl bg-purple-600 px-6 py-3 text-white hover:bg-purple-700">
            Enable 2FA
          </button>

          <button className="rounded-xl bg-red-600 px-6 py-3 text-white hover:bg-red-700">
            Logout All Devices
          </button>

        </div>

      </div>

      {/* Bottom Buttons */}

      <div className="mt-10 flex flex-wrap gap-4">

        <button
          onClick={saveSettings}
          className="flex items-center gap-2 rounded-xl bg-green-600 px-8 py-3 text-white hover:bg-green-700"
        >
          <Save size={18}/>
          Save Changes
        </button>

        <button
          className="flex items-center gap-2 rounded-xl bg-gray-600 px-8 py-3 text-white hover:bg-gray-700"
        >
          <RotateCcw size={18}/>
          Reset
        </button>

      </div>

    </div>

  </div>

);

}

export default Settings;