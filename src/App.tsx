import { useRef, useState, type ComponentProps } from 'react'
import { Select } from '@base-ui/react/select'
import { motion, useReducedMotion } from 'motion/react'
import './App.css'

type Preset = {
  value: string
  label: string
  description: string
  signature: string
  code: string
  transition: {
    type: 'spring' | 'tween'
    stiffness?: number
    damping?: number
    duration?: number
    ease?: 'easeOut' | 'easeInOut'
  }
  visual: { x: number; y: number; rotate: number; scale: number }
}

const presets: Preset[] = [
  {
    value: 'spring',
    label: 'Soft spring',
    description: 'A little bounce, then a gentle settle',
    signature: 'stiffness: 420 · damping: 30',
    code: "transition={{ type: 'spring', stiffness: 420, damping: 30 }}",
    transition: { type: 'spring', stiffness: 420, damping: 30 },
    visual: { x: 27, y: -14, rotate: -7, scale: 1.04 },
  },
  {
    value: 'ease-out',
    label: 'Ease out',
    description: 'Quick start, smooth landing',
    signature: 'duration: 0.55s · easeOut',
    code: "transition={{ type: 'tween', duration: 0.55, ease: 'easeOut' }}",
    transition: { type: 'tween', duration: 0.55, ease: 'easeOut' },
    visual: { x: 38, y: -2, rotate: 6, scale: 0.98 },
  },
  {
    value: 'snappy',
    label: 'Snappy',
    description: 'Crisp feedback for tiny interactions',
    signature: 'stiffness: 650 · damping: 34',
    code: "transition={{ type: 'spring', stiffness: 650, damping: 34 }}",
    transition: { type: 'spring', stiffness: 650, damping: 34 },
    visual: { x: 12, y: -26, rotate: 12, scale: 1.08 },
  },
  {
    value: 'slow-drift',
    label: 'Slow drift',
    description: 'Unhurried movement with a soft finish',
    signature: 'duration: 0.9s · easeInOut',
    code: "transition={{ type: 'tween', duration: 0.9, ease: 'easeInOut' }}",
    transition: { type: 'tween', duration: 0.9, ease: 'easeInOut' },
    visual: { x: -6, y: -30, rotate: -12, scale: 0.94 },
  },
]

const popupVariants = {
  closed: { opacity: 0, scale: 0.97, y: -6 },
  open: { opacity: 1, scale: 1, y: 0 },
}

function ChevronIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="m5.5 7.5 4.5 4 4.5-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="m4.5 10.3 3.4 3.3 7.6-7.4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M12 2.8 14.2 9.8 21.2 12l-7 2.2-2.2 7-2.2-7L2.8 12l7-2.2L12 2.8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="m19 2 .7 2.3L22 5l-2.3.7L19 8l-.7-2.3L16 5l2.3-.7L19 2Z" fill="currentColor" />
    </svg>
  )
}

function App() {
  const [selectedValue, setSelectedValue] = useState(presets[0].value)
  const [open, setOpen] = useState(false)
  const actionsRef = useRef<Select.Root.Actions | null>(null)
  const openRef = useRef(false)
  const hasOpenedRef = useRef(false)
  const shouldReduceMotion = useReducedMotion()
  const selectedPreset = presets.find((preset) => preset.value === selectedValue) ?? presets[0]

  function handleOpenChange(nextOpen: boolean) {
    openRef.current = nextOpen
    if (nextOpen) hasOpenedRef.current = true
    setOpen(nextOpen)
  }

  function handlePopupAnimationComplete(definition: unknown) {
    if (definition === 'closed' && !openRef.current && hasOpenedRef.current) {
      hasOpenedRef.current = false
      actionsRef.current?.unmount()
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Motion Select Lab home">
          <span className="brand-mark"><SparkIcon /></span>
          <span className="brand-name">motion<span className="brand-slash">/</span>select</span>
        </a>
        <div className="topbar-right">
          <span className="live-label"><span className="live-dot" /> interactive study</span>
          <a className="docs-link" href="https://motion.dev/docs/base-ui" target="_blank" rel="noreferrer">
            Motion docs <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <main id="top">
        <section className="intro" aria-labelledby="page-title">
          <div className="eyebrow"><span className="eyebrow-rule" /> COMPONENT STUDY <span className="eyebrow-index">№ 01</span></div>
          <h1 id="page-title">Little details.<br /><span>Lovely motion.</span></h1>
          <p className="intro-copy">A thoughtfully animated select, built with Base UI and Motion for React. Pick a curve and feel the difference.</p>
        </section>

        <section className="workbench" aria-labelledby="workbench-title">
          <div className="workbench-topline">
            <div className="workbench-heading">
              <span className="section-index">01 / INTERACTION</span>
              <h2 id="workbench-title">Choose an easing</h2>
            </div>
            <div className="stack-badge"><span className="stack-dot" /> BASE UI <span className="stack-plus">+</span> MOTION</div>
          </div>

          <div className="workbench-grid">
            <div className="controls-panel">
              <p className="panel-intro">Every transition has a personality. Try a preset below to preview how it changes the motion.</p>

              <Select.Root
                value={selectedPreset.value}
                open={open}
                onOpenChange={handleOpenChange}
                onValueChange={(value) => {
                  if (typeof value === 'string') setSelectedValue(value)
                }}
                items={presets.map(({ value, label }) => ({ value, label }))}
                actionsRef={actionsRef}
              >
                <Select.Label className="field-label">ANIMATION CURVE</Select.Label>
                <Select.Trigger className="select-trigger" aria-label="Choose an animation curve">
                  <span className="trigger-leading"><span className="trigger-glyph"><SparkIcon /></span><Select.Value placeholder="Choose a curve" /></span>
                  <Select.Icon className="trigger-chevron"><ChevronIcon /></Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Positioner className="select-positioner" sideOffset={9} align="start">
                    <Select.Popup
                      className="select-popup"
                      render={(props, state) => {
                        const motionProps = props as unknown as ComponentProps<typeof motion.div>
                        return (
                          <motion.div
                            {...motionProps}
                            initial="closed"
                            animate={state.open ? 'open' : 'closed'}
                            variants={popupVariants}
                            transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 480, damping: 34 }}
                            onAnimationComplete={handlePopupAnimationComplete}
                          />
                        )
                      }}
                    >
                      <Select.List className="select-list">
                        {presets.map((preset, index) => (
                          <Select.Item className="select-item" key={preset.value} value={preset.value}>
                            <span className="item-index">0{index + 1}</span>
                            <span className="item-content">
                              <Select.ItemText className="item-name">{preset.label}</Select.ItemText>
                              <span className="item-description">{preset.description}</span>
                            </span>
                            <Select.ItemIndicator className="item-check"><CheckIcon /></Select.ItemIndicator>
                          </Select.Item>
                        ))}
                      </Select.List>
                    </Select.Popup>
                  </Select.Positioner>
                </Select.Portal>
              </Select.Root>

              <div className="selection-meta" aria-live="polite">
                <span className="meta-label">CURRENT PRESET</span>
                <span className="meta-value">{selectedPreset.signature}</span>
              </div>

              <div className="code-note">
                <span className="code-dot" />
                <code>{selectedPreset.code}</code>
              </div>
            </div>

            <div className="preview-panel" aria-label={`Motion preview using ${selectedPreset.label}`}>
              <div className="preview-header">
                <span className="preview-label">LIVE PREVIEW</span>
                <span className="preview-coordinates">x / y</span>
              </div>
              <div className="preview-stage">
                <div className="stage-grid" aria-hidden="true" />
                <div className="stage-caption stage-caption-top">DRAG THE FEEL</div>
                <motion.div
                  className="motion-orbit orbit-back"
                  animate={{ x: selectedPreset.visual.x * -0.4, y: selectedPreset.visual.y * -0.35, rotate: selectedPreset.visual.rotate * -0.5 }}
                  transition={shouldReduceMotion ? { duration: 0 } : selectedPreset.transition}
                  aria-hidden="true"
                />
                <motion.div
                  className="motion-orbit orbit-front"
                  animate={{ x: selectedPreset.visual.x, y: selectedPreset.visual.y, rotate: selectedPreset.visual.rotate, scale: selectedPreset.visual.scale }}
                  transition={shouldReduceMotion ? { duration: 0 } : selectedPreset.transition}
                  aria-hidden="true"
                >
                  <SparkIcon />
                </motion.div>
                <div className="stage-caption stage-caption-bottom"><span className="stage-indicator" /> {selectedPreset.label.toUpperCase()}</div>
              </div>
              <div className="preview-footer">
                <span>One component, four distinct feels.</span>
                <span className="preview-state"><span className="live-dot" /> READY</span>
              </div>
            </div>
          </div>

          <footer className="workbench-footer">
            <span>Built with <a href="https://base-ui.com/react/components/select" target="_blank" rel="noreferrer">Base UI Select</a></span>
            <span className="footer-center">Animated with <a href="https://motion.dev" target="_blank" rel="noreferrer">Motion for React</a></span>
            <span className="footer-shortcut">Try <kbd>↑</kbd> <kbd>↓</kbd> <kbd>↵</kbd></span>
          </footer>
        </section>

        <section className="closing-note" aria-label="Implementation note">
          <span className="closing-star"><SparkIcon /></span>
          <p>Accessible by default. Delightful by design.</p>
          <span className="closing-detail">KEYBOARD READY · REDUCED MOTION FRIENDLY</span>
        </section>
      </main>
    </div>
  )
}

export default App
