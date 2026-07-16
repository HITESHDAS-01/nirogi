export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-text">Settings</h1>
        <p className="text-text-muted">Manage your preferences</p>
      </div>

      <SettingsSection title="Language">
        <div className="space-y-3">
          <RadioOption label="English" checked />
          <RadioOption label="Hindi" />
          <RadioOption label="Assamese" />
          <RadioOption label="Bengali" />
          <RadioOption label="Tamil" />
          <RadioOption label="Telugu" />
          <RadioOption label="Marathi" />
        </div>
      </SettingsSection>

      <SettingsSection title="Notifications">
        <ToggleSetting label="Follow-up reminders" defaultChecked />
        <ToggleSetting label="Medication reminders" defaultChecked />
        <ToggleSetting label="Document processing complete" defaultChecked />
      </SettingsSection>

      <SettingsSection title="Account">
        <div className="space-y-3">
          <button className="w-full text-left px-4 py-3 rounded-lg border border-border hover:bg-surface-alt transition-colors text-sm font-medium text-text">
            Edit Profile
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg border border-border hover:bg-surface-alt transition-colors text-sm font-medium text-text">
            Change Password
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg border border-risk-red/20 hover:bg-risk-red/5 transition-colors text-sm font-medium text-risk-red">
            Sign Out
          </button>
        </div>
      </SettingsSection>

      <SettingsSection title="About">
        <p className="text-sm text-text-muted">
          Nirogi v0.1.0 — Personal AI Health Companion
        </p>
        <p className="text-xs text-text-muted mt-2">
          Nirogi is not a substitute for professional medical advice, diagnosis,
          or treatment.
        </p>
      </SettingsSection>
    </div>
  );
}

function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-border p-6">
      <h2 className="text-lg font-semibold text-text mb-4">{title}</h2>
      {children}
    </div>
  );
}

function RadioOption({
  label,
  checked,
}: {
  label: string;
  checked?: boolean;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="radio"
        name="language"
        defaultChecked={checked}
        className="w-4 h-4 text-primary focus:ring-primary/20"
      />
      <span className="text-sm text-text">{label}</span>
    </label>
  );
}

function ToggleSetting({
  label,
  defaultChecked,
}: {
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-text">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
      </label>
    </div>
  );
}
