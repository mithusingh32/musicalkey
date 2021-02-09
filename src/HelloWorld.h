#ifndef HELLOWORLD_H
#define HELLOWORLD_H

#include <napi.h>
#include <iostream>

namespace HelloWorld
{
        std::string returnHelloWorld();
        Napi::Value getAudioData(const Napi::CallbackInfo &info);

        // Wrapper
        Napi::String helloWorldWrapped(const Napi::CallbackInfo &info);

        // Export API
        Napi::Object Init(Napi::Env env, Napi::Object exports);
    NODE_API_MODULE(addon, Init)

} // namespace HelloWorld

#endif