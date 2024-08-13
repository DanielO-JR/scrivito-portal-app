const preferIndex =
  // https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-env-vars.html
  !!process.env.CODEBUILD_BUILD_ID

export function filenameFromUrl(url: string): string {
  const { pathname } = new URL(url)
  if (pathname === '/') return '/index.html'

  return preferIndex ? `${pathname}/index.html` : `${pathname}.html`
}
