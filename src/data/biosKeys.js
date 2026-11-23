export const BIOS_DATABASE = [
  {
    brand: "Dell",
    models: "Inspiron (5567, 3501, 5570), Vostro, Latitude, XPS",
    biosKey: "F2",
    bootKey: "F12",
    recoveryKey: "Ctrl + Esc",
    timingNote: "Turn on laptop, immediately tap key rhythmically twice every second until Dell logo appears."
  },
  {
    brand: "HP",
    models: "Pavilion (15-cs, 15-ec), 14s, 15s, Victus, Envy",
    biosKey: "F10",
    bootKey: "F9",
    menuKey: "Esc",
    recoveryKey: "Windows Key + B",
    timingNote: "Press [Esc] repeatedly the second the power light turns on to pause boot into Startup Menu."
  },
  {
    brand: "Lenovo",
    models: "IdeaPad (3, 5, Slim), ThinkPad (E14, L15), Legion",
    biosKey: "F2 (or Fn + F2)",
    bootKey: "F12 (or Fn + F12)",
    menuKey: "Novo Button",
    recoveryKey: "Fn + R",
    timingNote: "If keyboard is non-responsive, use a straightened paperclip to gently press the Novo pinhole on the right or left edge while laptop is OFF."
  },
  {
    brand: "Asus",
    models: "VivoBook (X512, 14, 15), ZenBook, TUF Gaming",
    biosKey: "F2",
    bootKey: "Esc",
    recoveryKey: "Alt + F10",
    timingNote: "Press and HOLD [F2] FIRST, then press the Power button once. Keep holding F2 until the blue or gray BIOS screen renders."
  },
  {
    brand: "Acer",
    models: "Aspire (3, 5, 7), Swift 3, Nitro 5, Predator",
    biosKey: "F2",
    bootKey: "F12 (Must enable in BIOS)",
    recoveryKey: "Alt + F10",
    timingNote: "Acer disables the [F12] Boot Menu by default. You must enter BIOS via [F2], go to Main tab, set 'F12 Boot Menu' to Enabled, and press F10 to save."
  }
];
