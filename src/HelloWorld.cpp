#include <iostream>
#include <sstream>

#include "HelloWorld.h"
#include "AudioAnalyzer.h"

namespace HelloWorld
{
    std::string returnHelloWorld() { return "Hello World"; }

    Napi::Value getAudioData(const Napi::CallbackInfo &info)
    {
        Napi::Function callback = info[0].As<Napi::Function>();
        AudioAnalyzer::AudioAnalyzer* test = new AudioAnalyzer::AudioAnalyzer(callback);
        test->Queue();
        return Napi::String::New(info.Env(),"Test");
    }

    Napi::Object Init(Napi::Env env, Napi::Object exports)
    {
        exports.Set(
            Napi::String::New(env, "getData"),
            Napi::Function::New(env, getAudioData));
        return exports;
    }

} // namespace HelloWorld
