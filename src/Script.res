// SPDX-License-Identifier: PMPL-1.0-or-later
// STAMP Protocol Website - Interactive Elements (ReScript)

// DOM Types
type element
type intersectionObserverEntry
type intersectionObserverOptions = {
  threshold: float,
  rootMargin: string,
}

@val external document: 'a = "document"
@send external querySelector: ('a, string) => Js.Nullable.t<element> = "querySelector"
@send external querySelectorAll: ('a, string) => array<element> = "querySelectorAll"
@send external addEventListener: (element, string, 'event => unit) => unit = "addEventListener"
@send external preventDefault: 'event => unit = "preventDefault"
@send external getAttribute: (element, string) => Js.Nullable.t<string> = "getAttribute"
@send external scrollIntoView: (element, {"behavior": string, "block": string}) => unit = "scrollIntoView"

// IntersectionObserver bindings
@new external makeIntersectionObserver: (
  array<intersectionObserverEntry> => unit,
  intersectionObserverOptions,
) => {..} = "IntersectionObserver"
@send external observe: ({..}, element) => unit = "observe"
@get external isIntersecting: intersectionObserverEntry => bool = "isIntersecting"
@get external target: intersectionObserverEntry => element = "target"

// Style manipulation
@set external setOpacity: (element, string) => unit = "style.opacity"
@set external setTransform: (element, string) => unit = "style.transform"
@set external setTransition: (element, string) => unit = "style.transition"

@val external console: {..} = "console"

// Smooth scrolling for anchor links
let setupSmoothScrolling = () => {
  document
  ->querySelectorAll("a[href^=\"#\"]")
  ->Array.forEach(anchor => {
    anchor->addEventListener("click", event => {
      event->preventDefault

      switch anchor->getAttribute("href")->Js.Nullable.toOption {
      | Some(href) =>
        switch document->querySelector(href)->Js.Nullable.toOption {
        | Some(target) =>
          target->scrollIntoView({"behavior": "smooth", "block": "start"})
        | None => ()
        }
      | None => ()
      }
    })
  })
}

// Animate elements on scroll
let setupScrollAnimations = () => {
  let observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  }

  let statsObserver = makeIntersectionObserver(
    entries => {
      entries->Array.forEach(entry => {
        if entry->isIntersecting {
          let target = entry->target
          target->setOpacity("1")
          target->setTransform("translateY(0)")
        }
      })
    },
    observerOptions,
  )

  // Animate stat cards
  document
  ->querySelectorAll(".stat-card")
  ->Array.forEach(card => {
    card->setOpacity("0")
    card->setTransform("translateY(30px)")
    card->setTransition("all 0.6s ease-out")
    statsObserver->observe(card)
  })

  // Animate features with stagger
  document
  ->querySelectorAll(".feature")
  ->Array.forEachWithIndex((feature, index) => {
    feature->setOpacity("0")
    feature->setTransform("translateY(30px)")
    feature->setTransition(`all 0.6s ease-out ${Float.toString(Float.fromInt(index) *. 0.1)}s`)

    let featureObserver = makeIntersectionObserver(
      entries => {
        entries->Array.forEach(entry => {
          if entry->isIntersecting {
            let target = entry->target
            target->setOpacity("1")
            target->setTransform("translateY(0)")
          }
        })
      },
      observerOptions,
    )

    featureObserver->observe(feature)
  })
}

// Track demo bot clicks
let trackDemoBotClicks = () => {
  document
  ->querySelectorAll("a[href*=\"t.me/stamp_demo_bot\"]")
  ->Array.forEach(link => {
    link->addEventListener("click", _event => {
      console["log"]("Demo bot link clicked")
      // Could add analytics here
    })
  })
}

// Initialize all interactive features
let init = () => {
  setupSmoothScrolling()
  setupScrollAnimations()
  trackDemoBotClicks()
}

// Run on DOM load
document->addEventListener("DOMContentLoaded", _event => init())
