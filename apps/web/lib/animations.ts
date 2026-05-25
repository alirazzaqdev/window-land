// GSAP animation configs — import gsap and ScrollTrigger in each component that uses these

export const fadeUpConfig = {
  opacity: 0,
  y: 50,
  duration: 0.7,
  ease: 'power2.out',
}

export const staggerConfig = {
  stagger: 0.1,
  ease: 'power3.out',
  duration: 0.8,
}

export const heroWordConfig = {
  opacity: 0,
  y: 40,
  duration: 0.8,
  stagger: 0.08,
  ease: 'power3.out',
}

export const scrollTriggerDefaults = {
  start: 'top 85%',
  toggleActions: 'play none none none',
}

export const counterConfig = {
  duration: 2,
  ease: 'power2.out',
  snap: { innerText: 1 },
}
