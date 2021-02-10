#include <iostream>
#include <sstream>

#include "AudioAnalyzerWrapper.h"
#include "AudioAnalyzer.h"

namespace AudioAnalyzerWrapper
{
    std::string returnHelloWorld() { return "Hello World"; }

    Napi::Value getAudioData(const Napi::CallbackInfo &info)
    {
         Napi::Env env = info.Env();
        if (info.Length() < 2)
        {
            Napi::TypeError::New(env, "Wrong number of arguments")
                .ThrowAsJavaScriptException();
            return env.Null();
        }

        if (!info[0].IsString() || !info[1].IsFunction())
        {
            Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
            return env.Null();
        }

        Napi::Function callback = info[1].As<Napi::Function>();
        AudioAnalyzer::AudioAnalyzer *test = new AudioAnalyzer::AudioAnalyzer(callback, info[0].As<Napi::String>());
        test->Queue();
        return Napi::String::New(info.Env(), "Test");
    }

    Napi::Object Init(Napi::Env env, Napi::Object exports)
    {
        exports.Set(
            Napi::String::New(env, "getData"),
            Napi::Function::New(env, getAudioData));
        return exports;
    }

} // namespace HelloWorld
