# Expo Router and Uniwind 

Use [Expo Router](https://docs.expo.dev/router/introduction/) with [Uniwind](https://docs.uniwind.dev/) styling.

## Launch your own

[![Launch with Expo](https://github.com/expo/examples/blob/master/.gh-assets/launch.svg?raw=true)](https://launch.expo.dev/?github=https://github.com/expo/examples/tree/master/with-router-uniwind)

## 🚀 How to use

```sh
npx create-expo-app -e with-router-uniwind
```

### iOS Simulator (if "Operation timed out" when opening)

The dev server uses `--localhost` so the URL is `exp://127.0.0.1:PORT`. **Do not press `i`** in the terminal (it will timeout). Instead: in the Simulator, open **Safari** and go to that URL (e.g. `exp://127.0.0.1:8081`).

## Deploy

Deploy on all platforms with Expo Application Services (EAS).

- Deploy the website: `npx eas-cli deploy` — [Learn more](https://docs.expo.dev/eas/hosting/get-started/)
- Deploy on iOS and Android using: `npx eas-cli build` — [Learn more](https://expo.dev/eas)
