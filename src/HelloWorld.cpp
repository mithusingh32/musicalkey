#include "HelloWorld.h"
#include "AudioAnalyzer.h"

namespace HelloWorld
{
    std::string HelloWorld::returnHelloWorld() { return "Hello World"; }

    Napi::String HelloWorld::helloWorldWrapped(const Napi::CallbackInfo &info)
    {
        Napi::Env env = info.Env();
        AudioAnalyzer::AudioAnalyzer aAudio; 
        Napi::String returnString = Napi::String::New(env, aAudio.aString());
        return returnString;
    }

    Napi::Object HelloWorld::Init(Napi::Env env, Napi::Object exports)
    {
        exports.Set("hello", Napi::Function::New(env, HelloWorld::helloWorldWrapped));
        return exports;
    }

} // namespace HelloWorld
